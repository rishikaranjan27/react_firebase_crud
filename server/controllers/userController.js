'use strict';

import data from '../data.js'
import User from '../models/user.js';
import {database, storage} from '../firebase.js';

import { collection, query, where , getDocs, getCountFromServer, getDoc, doc, setDoc, writeBatch } from "firebase/firestore";
import { ref, getDownloadURL, listAll } from "firebase/storage";






const countUsers = async (req, res) => {

    try {

        const userRef = collection(database, "users");

        const queryMale = query(
            userRef,
            where('Gender', '==', 'Male')
        )
        const snapshotMale = await getCountFromServer(queryMale);
        const totalMaleCount = snapshotMale.data().count;


        const queryFemale = query(
            userRef,
            where('Gender', '==', 'Female')
        )
        const snapshotFemale = await getCountFromServer(queryFemale);
        const totalFemaleCount = snapshotFemale.data().count;


        res.send({totalMaleCount, totalFemaleCount});

    }

    catch(err) {
        console.log(err);
    }
}


const filterBy = async(req, res) => {

    try {

        const filterType = req.params.filterType;

        const filterValue = req.params.filterValue;

        let slicedfilterValue = filterValue;

        if(filterType == 'Date') {

            slicedfilterValue = filterValue.slice(8,10) + "-" + filterValue.slice(4,7) + "-" + filterValue.slice(13,15);

            if(slicedfilterValue[0] == '0') {

                slicedfilterValue = filterValue.slice(9,10) + "-" + filterValue.slice(4,7) + "-" + filterValue.slice(13,15);
            }

        }
        
        const userRef = collection(database, "users");

        const que = query(userRef, where(filterType, "==", slicedfilterValue));

        const querySnapshot = await getDocs(que);

        const filteredUserArray = [];

        querySnapshot.forEach((doc) => {

            const user = new User(
                doc.id,
                doc.data().ID,
                doc.data().Location,
                doc.data().Gender,
                doc.data().Name,
                doc.data().Date,
                doc.data().Time,
                );
        
                filteredUserArray.push(user);
        });

        res.send(filteredUserArray);
        console.log(filteredUserArray);

    } 

    catch(err) {
        console.log(err);
    }

}



const getAllUsersImages = async (req, res, next) => {

    try {

        const listRef = ref(storage, 'img');


        if(listRef.empty) {
            res.status(404).send('No images record found');
        }

        listAll(listRef)
            .then((itemRef) => {
                itemRef.items.forEach((imageRef) => {
                    getDownloadURL(imageRef)
                     .then((url) => {

                        if(url.length == 148) {

                            setDoc(doc(database, "i", url.slice(83, 91)), {
                            imageUrl: url,
                            });

                        }

                        else {

                            setDoc(doc(database, "i", url.slice(83, 89)), {
                                imageUrl: url,
                            });
                        }

                    })
                })

                res.send({message: "All images added to database"});
       
            })
 
        .catch((error) => {
            console.log(error);
        });

        
    }


    catch(err) {
        console.log(err);
    }


} 
    
    


const getAllUsers = async (req, res, next) => {

    try {


        const colRef = collection(database, "users");
        const docsSnap = await getDocs(colRef);
        const userArray = [];

    
        if(docsSnap.empty) {
            res.status(404).send('No user record found');
        }
        
        else {

            docsSnap.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().ID,
                    doc.data().Location,
                    doc.data().Gender,
                    doc.data().Name,
                    doc.data().Date,
                    doc.data().Time,
                );

                userArray.push(user);

            });


            res.send(userArray);
        }
    } 
    
    catch (error) {
        res.status(400).send(error.message);
    }


}



const getUser = async (req, res, next) => {

    try {
                const id = req.params.id;
        
                const docRef = doc(database, 'users', id);
        
                const docSnap = await getDoc(docRef);
        
                if(docSnap.exists()) {
                    res.send(docSnap.data());
                    console.log("user", docSnap.data());
                    
                }
                
                else {
                    res.status(404).send('User Image not found');
                    
                }
            } 
    
    catch (error) {
        res.status(400).send(error.message);
    }
}




const getUserImage = async (req, res, next) => {

    try {
                const id = req.params.id;
        
                const docRef = doc(database, 'images', id);
        
                const docSnap = await getDoc(docRef);
        
                if(docSnap.exists()) {
                    res.send(docSnap.data());
                    
                }
                
                else {
                    res.status(404).send('User Image not found');
                    
                }
            } 
    
    catch (error) {
        res.status(400).send(error.message);
    }
}



// const postUserData = async () => {

//     data.users.forEach((item) => {
//         addDoc(database, item)
//     .then(docRef => {
//         console.log("Document has been added successfully");
//     })
//     .catch(error => {
//         console.log(error);
//     })

//     })

   
// }







export {
    getAllUsersImages,
    getAllUsers,
    getUser,
    getUserImage,
    filterBy,
    countUsers,
    // postUserData
}


