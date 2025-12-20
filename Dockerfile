# ئەڤە سێرڤەرەکێ سڤك ئامادە دکەت بۆ پڕۆژێ تە
FROM nginx:alpine

# ئەڤە هەمی فایلێن تە (HTML, CSS, JS) کۆپی دکەتە ناڤ سێرڤەری
COPY . /usr/share/nginx/html

# ڤەکرنا ڕێکا پەیوەندیێ
EXPOSE 80