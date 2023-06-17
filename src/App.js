import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Shirt from './Components/Pages/Shirt/Shirt';
import Pant from './Components/Pages/Pant/Pant';
import Panjabi from './Components/Pages/Panjabi/Panjabi';
import LandingPage from './Components/Pages/LandingPage/LandingPage';
import Home from './Components/Pages/Home/Home';
import Offer from './Components/Pages/Offer/Offer';
import ProductInfo from './Components/Pages/ProductInfo/ProductInfo';
import Login from './Components/Pages/UserAccount/Login/Login';
import Register from './Components/Pages/UserAccount/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-modern-drawer/dist/index.css'
import PrivateRoute from './Components/Pages/UserAccount/PrivateRoute/PrivateRoute';
import Checkout from './Components/Pages/Checkout/Checkout';
import Cart from './Components/Pages/Cart/Cart';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage></LandingPage>,
      children: [
        {
          path: "/",
          element: <Home></Home>
        },
        {
          path: "Shirt",
          element: <Shirt></Shirt>
        },
        {
          path: "Pant",
          element: <Pant></Pant>
        },
        {
          path: "Panjabi",
          element: <Panjabi></Panjabi>
        },
        {
          path: "offer",
          element: <Offer></Offer>
        },
        {
          path: "cart/viewProduct",
          element: <PrivateRoute><Cart></Cart></PrivateRoute>
        },
        {
          path: "cart/checkout",
          element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
        },
        {
          path: "product/:id",
          element: <ProductInfo></ProductInfo>
        },
        {
          path: "user/login",
          element: <Login></Login>
        },
        {
          path: "user/register",
          element: <Register></Register>
        },
      ]
    }
  ]);


  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
