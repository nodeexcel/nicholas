import newsfeed_post from "../controllers/newsfeed_post";

export default (app) => {

    /* Routes for newsfeed_post */

    app.route("/newsfeed_post/createNewsfeedPost").post(newsfeed_post.createNewsfeedPost);

    app.route("/newsfeed_post/updateNewsfeedPost").post(newsfeed_post.updateNewsfeedPost);

    app.route("/newsfeed_post/deleteNewsfeedPost").post(newsfeed_post.deleteNewsfeedPost);

    return app;
};