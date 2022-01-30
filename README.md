# Aim:

- order and limit data fireship ((docs)[https://firebase.google.com/docs/firestore/query-data/order-limit-data?authuser=0#order_and_limit_data])
- re(render) with firestore updates
- firebase google authentication

# Notes

- Create tsconfig.json with: npx tsc --init
- ref is reference to either a database, a collection or a document
- Document Snapshot is kind of like the offline downloaded version of the document
- Listening to realtime firestore data is dead simple with useCollectionData hook from react-firebase-hooks
