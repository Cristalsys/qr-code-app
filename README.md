<p align="center">
<img src="client/src/utils/images/logo.jpg" alt="Logo" height = "300px">
</p>


# qr-code-app
> **Document authentication system using QR-code**

##  **Desciption**

A system for verifying the authenticity of documents using a QR code, which, through the use of a QR code for documents based on cryptographic data, provides for the determination of the authenticity and integrity of documents.

## **How does it work**

A pair of keys is selected - public and private. The first, as the name implies, is available to everyone, and the second is better to keep the signature secret. Of course, the keys are chosen so that the private key can not be easily guessed from the public key. Then the private key is used to encrypt the document, and the public - to decrypt. The key selection algorithms ensure that the public key can decrypt only those documents that have been encrypted with the corresponding private key.

**Sender process:**
1. The message M is created from such detail as the conclusion number.
2. Due to the fact that private key encryption of a large document is a rather complex and long process, usually a faster and simpler hash encryption is first applied to the text of the document, from which in this case the hash value H is generated.
3. The H hash value is encrypted with the sender's private key, which results in a digital signature on the message M.
4. The M message, the sender's public key, and the digital signature are combined and compressed to a reduced size so that they can be stored in the QR code, because the QR code has a limited capacity and is fed to the QR code generator.
5. The QR code generator generates a QR code that stores the M message, a digital signature, and the sending public key.
6. The QR code is printed and inserted into the document.


<img src="https://user-images.githubusercontent.com/44903532/143611045-399297e1-a41d-4508-8608-d9ed466db519.png" alt="Sender" width = "500px">

When the recipient receives the document from the sender, he / she can verify the authenticity of the document. The process of verifying the integrity of the information stored in the QR code begins.

**Receiver process:**

1. The information in the QR code consists of a message, a public key and the sender's signature on the message, which are compressed.
2. There is a process of scanning the QR-code and uncompressing the data using a mobile application.
3. Comparison of the hash value of the received message (H1) and the value from the decryption of the signature (H2) using the sender's public key.
4. If both values are the same, the signature is valid.
5. However, if the hash values are different, it can be concluded that the message has been modified.


<img src="https://user-images.githubusercontent.com/44903532/143612693-de7a5f1d-7b43-417b-b2e8-d974126b1960.png" alt="Recepient" width = "500px">

## Link
https://qr-code-app-encryption.herokuapp.com

## Technology

- Frontend: [React](https://github.com/facebook/react)
- State management: [Redux](https://github.com/reduxjs/redux)
- Routing: [React Router](https://github.com/remix-run/react-router)
- Design: [Material UI](https://github.com/mui-org/material-ui)
- Backend: [Express](https://github.com/expressjs/express)
- Database: [MongoDB](https://github.com/Automattic/mongoose)
- Mobile: [React Native (Expo)](https://github.com/expo/expo)

## Screenshots

> website

<p float="left">
  <img src="https://user-images.githubusercontent.com/44903532/143616215-c8082b85-3a3f-443b-9611-f914473deda7.jpg" width ="500px"/>
  <img src="https://user-images.githubusercontent.com/44903532/143616749-0386dc1d-45f9-4b04-81e4-90d1482d7aef.jpg" width="500px" /> 
</p>


<p float="left">
  <img src="https://user-images.githubusercontent.com/44903532/143618349-72ab2b24-2681-4aa6-9eb1-898ad868b587.jpg" width ="500px"/>
  <img src="https://user-images.githubusercontent.com/44903532/143618335-645cd7cd-854d-453b-a620-72c37927fb6b.jpg" width="500px" /> 
</p>

<p float="left">
 <img src="https://user-images.githubusercontent.com/44903532/143618337-5e4828ad-2273-41af-80df-38b3b7f7e41d.jpg" width ="500px">
 <img src="https://user-images.githubusercontent.com/44903532/143618339-96b8602f-1ef5-48ce-a5b8-d0e7dfb438cc.jpg" width ="500px">
</p>

> mobile

<p float="left">
 <img src="https://user-images.githubusercontent.com/44903532/143619754-a31fb2a9-1376-40d6-891c-87496dfe7974.jpg" height ="350px">
 <img src="https://user-images.githubusercontent.com/44903532/143619760-c32a06f2-11a8-4559-9810-22f283f13443.jpg" height ="350px">
 <img src="https://user-images.githubusercontent.com/44903532/143619762-7b0cd331-c5cf-4b95-8c1d-b205f710cc29.jpg" height ="350px">
</p>

<p float="left">
<img src="https://user-images.githubusercontent.com/44903532/143619772-5c9d0292-cc5a-4d93-a2e7-98241df5e1c9.jpg" height ="350px">
<img src="https://user-images.githubusercontent.com/44903532/143619773-afb3d260-8911-4eb6-b771-400c8c0b35e1.jpg" height ="350px">
</p>


<p float="left">
 <img src="https://user-images.githubusercontent.com/44903532/143619764-c382fe0f-60c3-4b8f-8d28-0d36d8951f3b.jpg" height ="350px">
 <img src="https://user-images.githubusercontent.com/44903532/143620017-cfbc9049-6f3e-4137-9e0b-ff58af08f19c.jpg" height ="350px">
 <img src="https://user-images.githubusercontent.com/44903532/143619765-86a1b9e3-9158-4b7a-a8aa-bbecf87d1db6.jpg" height ="350px">
</p>

<p float="left">
 <img src="https://user-images.githubusercontent.com/44903532/143620061-7b44cabb-c760-48f9-a760-2a573f1d6a4d.jpg" height ="350px">
 <img src="https://user-images.githubusercontent.com/44903532/143619778-defaa585-ec63-4b81-b6c6-02745f16d79b.jpg" height ="350px">
</p>
