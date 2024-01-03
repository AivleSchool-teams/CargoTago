const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/naver_api",
        createProxyMiddleware({
            target: "https://openapi.naver.com",
            pathRewrite: {
                //naver_api로 시작되는 url을 자동 인식 -> 프록시 처리, /naver_api는 ""로 대체됨
                "^/naver_api": "",
            },
            changeOrigin: true,
        })
    );
};