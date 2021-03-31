module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false
            }
        ]],
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-plus",
                "styleLibraryName": "theme-chalk"
            }
        ],
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": 3 // 指定 runtime-corejs 的版本，目前有 2 3 两个版本
            }
        ],
        "equire"
    ]
}

