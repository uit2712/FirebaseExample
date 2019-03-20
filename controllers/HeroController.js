import firebase from '@firebase/app';
const firestore = require('@firebase/firestore');
import Hero from '../models/Hero';
import Message from '../models/Message';

firebase.initializeApp({
    apiKey: 'AIzaSyBUdfkOVM4g74BnMXqzQo56JZjSLJh_Ag4',
    authDomain: 'herodb-316ad.firebaseio.com',
    projectId: 'herodb-316ad'
});

let db = firebase.firestore();

// return promise
export const getAllHeroes = () => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        if (!db) {
            msg.message = 'Database doesn\'t initialize';
            resolve({ result: msg.result, message: msg.message });
        }

        db.collection('heroes')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    let hero = new Hero(doc.id, doc.data());
                    msg.result.push(hero);
                })
                msg.message = 'Get all heroes successfully!';
                resolve({ result: msg.result, message: msg.message });
            }).catch(error => {
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
            });
    })
}

export const createHero = (hero: Hero) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!hero) {
            msg.result = false;
            msg.message = 'Invalid hero input!';
            resolve({ result: msg.result, message: msg.message });
        }

        if (!db) {
            msg.result = false;
            msg.message = 'Database doesn\'t initialize';
            resolve({ result: msg.result, message: msg.message });
        }

        db.collection('heroes')
            .add(hero.getObjectInfo())
            .then((querySnapshot) => {
                msg.result = true;
                msg.message = 'Create new hero successfully!';
                resolve({ result: msg.result, message: msg.message });
            }).catch(error => {
                msg.result = false;
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
            });
    });
}

const checkIfHeroExists = (heroId: string) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();

        if (!db) {
            msg.result = false;
            msg.message = 'Database doesn\'t initialize';
            resolve({ result: msg.result, message: msg.message });
        }

        // check if hero exists
        db.collection('heroes')
            .doc(heroId)
            .get()
            .then(querySnapshot => {
                // hero exists
                msg.result = true;
                msg.message = `Found 1 hero with id=${heroId}`;
                resolve({ result: msg.result, message: msg.message });
            }).catch(error => {
                // hero doesn't exists
                msg.result = false;
                msg.message = `Not found hero with id=${heroId}`;
                resolve({ result: msg.result, message: msg.message });
            })
    });
}

export const updateHero = (hero: Hero) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        if (!hero) {
            msg.result = false;
            msg.message = 'Invalid hero input!';
            resolve({ result: msg.result, message: msg.message });
        }

        if (!db) {
            msg.result = false;
            msg.message = 'Database doesn\'t initialize';
            resolve({ result: msg.result, message: msg.message });
        }

        // check if hero exists
        checkIfHeroExists(hero.heroId).then(({ result, message }) => {
            if (!result) {
                // not found hero
                msg.result = false;
                msg.message = message;
                resolve({ result: msg.result, message: msg.message });
            }

            // override data with existing doc
            db.collection('heroes')
                .doc(hero.heroId)
                .set(hero.getObjectInfo())
                .then(querySnapshot => {
                    msg.result = true;
                    msg.message = 'Update hero successfully!';
                    resolve({ result: msg.result, message: msg.message });
                }).catch(error => {
                    msg.result = false;
                    msg.message = `${error.message}`;
                    resolve({ result: msg.result, message: msg.message });
                });
        })
    });
}

export const deleteHero = (heroId: string) => {
    return new Promise((resolve, reject) => {
        let msg = new Message();

        if (!db) {
            msg.result = false;
            msg.message = 'Database doesn\'t initialize';
            resolve({ result: msg.result, message: msg.message });
        }

        // check if hero exists
        checkIfHeroExists(heroId).then(({ result, message }) => {
            if (!result) {
                // not found hero
                msg.result = false;
                msg.message = message;
                resolve({ result: msg.result, message: msg.message });
            }

            // override data with existing doc
            db.collection('heroes')
                .doc(heroId)
                .delete()
                .then(querySnapshot => {
                    msg.result = true;
                    msg.message = 'Delete hero successfully!';
                    resolve({ result: msg.result, message: msg.message });
                }).catch(error => {
                    msg.result = false;
                    msg.message = `${error.message}`;
                    resolve({ result: msg.result, message: msg.message });
                });
        })
    });
}