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

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;
import com.google.gson.Gson;

/** Servlet that returns thread of comments. */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  public ArrayList<String> comments = new ArrayList<>();
 
  @Override 
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    String json = new Gson().toJson(comments);
    response.getWriter().println(json);
  }

 /**
  * Takes data from the request and populates arraylist
  */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String text = getParameter(request, "comment-box", "");
    //Handles empty comments, does not add them to the thread
    if(validComment(text)){
        comments.add(text);
        response.setContentType("text/html");
    }

    // Redirect back to the HTML page.
    response.sendRedirect("/index.html");
  }
/**
 * Returns the request parameter, or the default value if the parameter was not specified by the client
 */
  private String getParameter(HttpServletRequest request, String name, String defaultValue) {
    String value = request.getParameter(name);
    if (value == null) {
      return defaultValue;
    }
    return value;
  }
/**
 * Validates a comment if it has at least a character that is not a white space
 */
  public boolean validComment(String comment){
    if(comment.isEmpty()){
        return false;
      }
    for(int j = 0; j < comment.length(); j++){
        if(comment.charAt(j) != ' '){
          return true;
        }else{
          if(j == comment.length()-1){ //invalid comment if the string is only white spaces
          return false;
          }
        }
      }
    return false;
  }
}
