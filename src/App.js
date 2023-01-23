import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Step1_Basic_Details from "./components/become a retailer/Step1_Basic_Details";
import Step2_AdhaarDetails from "./components/become a retailer/Step2_AdhaarDetails";
import Step3_BankDetails from "./components/become a retailer/Step3_BankDetails";
import Step_4_VideoKYC from "./components/become a retailer/Step_4_VideoKYC";
import BroadBand from "./components/BroadBand/BroadBand";
import Complain from "./components/Complain/Complain";
import Dth from "./components/DTH/Dth";
// import Dummy from "./components/Dummy";
import Electricity from "./components/electricity/Electricity";
import ElectricityBillPay from "./components/electricity/ElectricityBillPay";
import FastTag from "./components/FastTag.jsx/FastTag";
import Footer from "./components/Footer";
import GasBooking from "./components/gas booking/GasBooking";
import Header from "./components/Header";
import Home from "./components/Home";
import Lic from "./components/LIC/Lic";
import MobileRecharge from "./components/Mobile Recharge/MobileRecharge";
import ViewPlans from "./components/Mobile Recharge/ViewPlans";
import N404 from "./components/N404";
import Kyc from "./components/pages/Completekyc";
import Login from "./components/pages/Login";
import MainBody from "./components/pages/MainBody";
import OtpVerification from "./components/pages/OtpVerification";
import Profile from "./components/pages/Profile";
import Preloader from "./components/Preloader";
import MyProfile from "./components/profile/MyProfile";
import AllTransaction from "./components/transaction/AllTransaction";
import DthTransactions from "./components/transaction/DthTransactions";
import MobileTransaction from "./components/transaction/MobileTransaction";

function App() {
  return (
    <BrowserRouter basename={"/grtechfront"}>
      <Preloader />
      {/* <Dummy/> */}
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/otpverification" element={<OtpVerification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/kyc" element={<Kyc />} />
      </Routes>

      <Routes>
        <Route
          path="/dashboard"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/electricity"
          element={
            <>
              <Header />
              <Electricity />
            </>
          }
        />
        <Route
          path="/electricity/bill"
          element={
            <>
              <Header />
              <ElectricityBillPay />
            </>
          }
        />
        <Route
          path="/mobile"
          element={
            <>
              <Header />
              <MobileRecharge />
            </>
          }
        />
        <Route
          path="/dth"
          element={
            <>
              <Header />
              <Dth />
            </>
          }
        />
        <Route
          path="/gasbooking"
          element={
            <>
              <Header />
              <GasBooking />
            </>
          }
        />
        <Route
          path="/lic"
          element={
            <>
              <Header />
              <Lic />
            </>
          }
        />
        <Route
          path="/fastag"
          element={
            <>
              <Header />
              <FastTag />
            </>
          }
        />
        <Route
          path="/broadband"
          element={
            <>
              <Header />
              <BroadBand />
            </>
          }
        />
        <Route
          path="/myprofile"
          element={
            <>
              <Header />
              <MyProfile />
            </>
          }
        />
        <Route
          path="/mobile/transactions"
          element={
            <>
              <Header />
              <MobileTransaction />
            </>
          }
        />
        <Route
          path="/dth/transactions"
          element={
            <>
              <Header />
              <DthTransactions />
            </>
          }
        />
        <Route
          path="/dashboard/trasactions"
          element={
            <>
              <Header />
              <AllTransaction />
            </>
          }
        />
        <Route
          path="/dashboard/complain"
          element={
            <>
              <Header />
              <Complain />
            </>
          }
        />
        <Route
          path="/become_a_retailer/stepone"
          element={
            <>
              <Header />
              <Step1_Basic_Details />
            </>
          }
        />
        <Route
          path="/become_a_retailer/steptwo"
          element={
            <>
              <Header />
              <Step2_AdhaarDetails />
            </>
          }
        />
        <Route
          path="/become_a_retailer/stepthree"
          element={
            <>
              <Header />
              <Step3_BankDetails />
            </>
          }
        />
        <Route
          path="/become_a_retailer/stepfour"
          element={
            <>
              <Header />
              <Step_4_VideoKYC />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
