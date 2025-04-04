import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import "./verify.css";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

export const Verify = () => {
  const [searchparams, setParams] = useSearchParams(); //Use to access the values present in the url

  const success = searchparams.get("success");
  const orderId = searchparams.get("orderId");
  //   console.log(success, orderId);

  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myOrders");
    } else {
      console.log(response.data.success);

      //   alert("error");
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};
