## Deprecated

Project này ko còn là code base nữa, mà chuyển sang [Lili Player Admin](https://github.com/anhtuta/liliana-player-admin). Các components mới nhất, công nghệ mới nhất sẽ được add vào project đó mà ko update vào project này nữa!

Nhưng project này là project tutorial about Reactjs, khi cần học gì mới hay test thử chức năng gì thì có thể dùng

## Note

- Mọi common components đều xử lý state, update value trong chính nó, và component cha chỉ cần truyền default value là giá trị khởi tạo cho value của common component
- Sau khi common component update value, nó sẽ gọi method onChange từ component cha truyền cho, để truyền new value nó vừa update cho cha. Component cha KHÔNG dùng value đó để update common component, mà chỉ dùng để lưu vào database
- This project works on Nodejs version 16.12.0
  - If you are using Node 17+, it will get error when start. I use `--openssl-legacy-provider` in `package.json` file to temporary fix this
  - When I upgrade dependencies, I will remove this config

## How to run

- First, we need a backend, please refer to this project: https://github.com/anhtuta/awesome-spring-boot
- Clone this repo, and start (this is SpringBoot project, written in Java)
- Second, install dependencies: `yarn install`
- Finally, start our application: `yarn start`

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3002](http://localhost:3002) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
