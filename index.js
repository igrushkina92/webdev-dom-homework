import {fetchComments} from "./modules/api.js"
import {updateComments} from "./modules/comments.js"
import {renderComments} from "./modules/renderComments.js"
import {initAddCommentListener} from "./modules/initListeners.js"

document.querySelector(".comments").innerHTML = "Пожалуйста подождите, комментарий загружается"

fetchComments().then((data) => {
    updateComments(data)
    renderComments();
});

initAddCommentListener(renderComments);
