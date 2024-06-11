const xhr = new XMLHttpRequest;

xhr.addEventListener('load', () =>{
    console.log(xhr.response);
}); //当respond has been loaded

xhr.open('GET', 'https://supersimplebackend.dev/hello'); //set up
xhr.send();  // send message
