import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

let mode = 'development'; // По умолчанию режим development
if (process.env.NODE_ENV === 'production') { // Режим production, если 
  // при запуске вебпака было указано --mode=production
  mode = 'production';
}

const html: any = {
    test: /\.(html)$/,
    use: ['html-loader']
}

const pluginMain: any = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './public/index.html', // Данный html будет использован как шаблон
  }),
  
];
const pluginNote: any = [
    new HtmlWebpackPlugin({
        filename: 'note.html',
        template: './public/note.html', // Данный html будет использован как шаблон
    }),
]

const tsx: any = {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: {
        loader: "babel-loader",
    },
}

const css = {
    test: /\.s[ac]ss$/i,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader'
    ]
}

const img = {
    test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
    type: mode === 'production' ? 'asset' : 'asset/resource',
}

const devServer: any = {
    static: path.join(__dirname, "build"),
    compress: true,
    port: 4000,
}

const config = [
    {
        entry: "./src/react.tsx",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "react.js",
        },
        module: {
            rules: [
                tsx,
                html,
                css, 
                img
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        plugins: pluginMain,
    },
    {
        mode: 'development',
        entry: './src/electron.ts',
        target: 'electron-main',
        module: {
            rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            }]
        },
        
        output: {
            path: path.resolve(__dirname, "build"),
            filename: 'electron.js'
        }
    },
    {
        entry: './src/preload.ts',
        target: 'electron-preload',
        module: {
            rules: [{
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            }]
        },
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'preload.js'
        }
    },
    {
        entry: "./src/note.tsx",
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "note.js",
        },
        module: {
            rules: [
                tsx,
                html,
                css, 
                img
            ],
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js"],
        },
        plugins: pluginNote, 
        
    }
]

export default config;