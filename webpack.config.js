const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === "development"

const config = {
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    //“__dirname，目录所在地址”拼接成一个绝对入口路径，确保能够绝对访问到
    output: {
        filename: 'bundle.js', //输出文件名
        path: path.join(__dirname, 'dist') //输出文件地址
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                //加载 .css 文件
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                //css 预处理器
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                //加载图片文件
                test:/\.(gif|png|jpg|jpeg|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{//loader 的参数配置
                            limit:1024, // 图片大小 1024
                            name:'[name]-aaa.[ext]'//新文件名字 Ican-: 文件名前缀, [name]:原文件名,[ext]:扩展名
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ? '"development"':'"product"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){
    config.devtool = '#cheap-module-eval-souuce-map'
    //官方推荐写法，一方面效率比较高，一方面正确性也比较高
    config.devServer = {
        port:'8000',
        host:'0.0.0.0',
        overlay:{
            errors:true,
        },
        hot:true,
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

}
module.exports = config