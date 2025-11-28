import { comments, updateComments } from "./comments.js";
import { sanitizeHtml } from "./sanitizeHtml.js";
import { postComment } from "./api.js";

export const initLikeListeners = (renderComments) => {
    const likeButtons = document.querySelectorAll(".like-button");

       for (const likeButton of likeButtons) {
        likeButton.addEventListener("click", (event) => {
          event.stopPropagation();
          const index = likeButton.dataset.index;
          const comment = comments[index];

          comment.likes = comment.isLiked
          ? comment.likes - 1
          : comment.likes + 1;

          comment.isLiked = !comment.isLiked;

          renderComments();
        });
       }
}

export const initReplyListeners = () => {
    const commentsElements = document.querySelectorAll(".comment");
    const text = document.getElementById("comment");


       for (const commentElement of commentsElements) {
        commentElement.addEventListener ("click", () => {
          const currentComment = comments [commentElement.dataset.index];
            text.value = `${currentComment.name}: ${currentComment.text}`;
        });
       }

}

export const initAddCommentListener = (renderComments) => {

  const button = document.getElementById("add")
  const name = document.getElementById("name");
  const text = document.getElementById("comment");

  button.addEventListener("click", () => {
    name.classList.remove("error");
    text.classList.remove("error");


    if (name.value.trim() === "") {
      name.classList.add("error");
      return;
    }

    if (text.value.trim() === "") {
      text.classList.add("error");
      return;
    }


    postComment(sanitizeHtml(text.value), sanitizeHtml(name.value)).then(
      (data) => {
        updateComments(data)
        renderComments()
          name.value = "";
          text.value = "";
      }
    )
  });
}