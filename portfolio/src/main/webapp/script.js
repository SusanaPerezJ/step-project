// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/**
 * Add a random photo to the page.
 **/
 function addRandomFact() {
     const facts = ['I am bilingual', 'I love plants', 'I have purple hair', 'My favorite color is blue'];
     //Choose a random fact
     const randomFact = facts[Math.floor(Math.random() * facts.length)];
     
     //Add random fact to the page
     const factContainer = document.getElementById('fact-container');
     factContainer.innerText = randomFact;
 }

//Fetches a message from the server and adds it to the DOM
function getFetchedMessage(){
    fetch('/data').then(response => response.text()).then ((message) => {
      document.getElementById('message-container').innerText = message;
    });
}