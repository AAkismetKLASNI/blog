области хранений данных:

1. json-server
2. BFF
3. redux store

сущности:

1. пользователь: БД, BFF, RS
2. роль: БД, BFF, RS
3. комментарии: БД, RS
4. статьи: БД, RS

таблица бз:

1. users: user_login, user_id, user_password, user_role_id, user_registered_at
2. roles: role_name, role_id,
3. comments: content, id, author_id, post_id
4. posts: post_title, post_id, post_content, post_image_url, post_published_at

схема bff:

1. user_login, user_password, user_role_id

стейты для редакса(client):

1. user: user_login, user_role_id, user_id
2. users: array user - user_registered_at, user_login, user_id, role_name
3. post: post_title, post_id, post_content, post_image_url, post_published_at, comments : [ content, id, author_id, published_at ]
4. posts: array post - post_title, post_id, post_content, post_image_url, post_published_at, commentsCount
