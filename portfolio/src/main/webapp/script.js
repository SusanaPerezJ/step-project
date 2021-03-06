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
 * Adds a random fact to the page.
 **/
 function addRandomFact() {
     const facts = ['I am bilingual', 'I love plants', 'I have purple hair', 'My favorite color is blue'];
     //Choose a random fact
     const randomFact = facts[Math.floor(Math.random() * facts.length)];
     
     //Add random fact to the page
     const factContainer = document.getElementById('fact-container');
     factContainer.innerText = randomFact;
 }

/**
 * Fetches the comments from the server
 */
 function getCommentThread(){
    var numComments = document.getElementById('max-comments');
    fetch("/data?maxComments=" + numComments.value)
    .then(response => response.json()) 
    .then((commentList) => {
        const allComments = document.getElementById('comment-thread');
        allComments.innerHTML = "";
	    commentList.forEach((line) => {
		allComments.appendChild(createSingleComment(line)); 
      });
    })
    .catch((error) => {
     console.error('Error:', error);
     });
}

/** 
 * Creates an <li> element containing text
 */
 function createSingleComment(text) {
    const liComment = document.createElement('li');
    liComment.className = 'comments';
    
    const titleElement = document.createElement('span');
    titleElement.innerText = text.comment;

    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.innerText = 'Delete';
    deleteButtonElement.addEventListener('click', () => {
      deleteComment(text);

      // Remove the comment from the DOM.
      liComment.remove();
    });

    liComment.appendChild(titleElement);
    liComment.appendChild(deleteButtonElement);
    return liComment;
 }

 /** Tells the server to delete the comment. */
 function deleteComment(comment) {
  const params = new URLSearchParams();
  params.append('id', comment.id);
  fetch('/delete-data', {method: 'POST', body: params});
 }

 /** Creates a map and adds it to the page. */
function createMap() {
    var myLatlng = new google.maps.LatLng(31.7678691, -106.5024917,20);
    var mapOptions = {
      zoom: 18,
      center: myLatlng,
      mapTypeId: 'hybrid'
    };
    const map = new google.maps.Map(
      document.getElementById('map'),
      mapOptions
    );
    map.setTilt(45);
    var marker = new google.maps.Marker({
    position: myLatlng,
    map: map
  });
}
