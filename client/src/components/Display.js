import { useState, useEffect } from "react";
import Upload from "../artifacts/contracts/Upload.sol/Upload.json";
import { ethers } from "ethers";
import "./Display.css";
import useAuth from "./hooks/useAuth";
 
const Display = () => {
   const [account, setAccount] = useState("");
   const [contract, setContract] = useState(null);
   const [provider, setProvider] = useState(null);
   const [modalOpen, setModalOpen] = useState(false);
   useEffect(() => {
     const provider = new ethers.providers.Web3Provider(window.ethereum);

     const loadProvider = async () => {
       if (provider) {
         window.ethereum.on("chainChanged", () => {
           window.location.reload();
         });

         window.ethereum.on("accountsChanged", () => {
           window.location.reload();
         });
         await provider.send("eth_requestAccounts", []);
         const signer = provider.getSigner();
         const address = await signer.getAddress();
         setAccount(address);
         let contractAddress = "0x5EA063d0A19B7182BBD1F5F08a3Eb8858cb1Fb01";

         const contract = new ethers.Contract(
           contractAddress,
           Upload.abi,
           signer,
         );
         console.log(contract);
         setContract(contract);
         setProvider(provider);
       } else {
         console.error("Metamask is not installed");
       }
     };
     provider && loadProvider();
   }, []);
  const [data, setData] = useState("");
  const [data2, setData2] = useState("");
  const auth = useAuth();
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        alert("Enter the address of the account you want to see")
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      console.log(str_array);
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} key={i} target="_blank">
            item no.:- {i}
          </a>
        );
      });
      setData2(images);
    } else {
      alert("No image to display");
    }
  };
    const getYourData = async () => {
      let dataArray;
      try {
    
          dataArray = await contract.display(account);
        
      } catch (e) {
        alert("You don't have access");
      }
      const isEmpty = Object.keys(dataArray).length === 0;

      if (!isEmpty) {
        const str = dataArray.toString();
        const str_array = str.split(",");
        console.log(str_array);
        // console.log(str);
        // console.log(str_array);
        const images = str_array.map((item, i) => {
          return (
            <a
              href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              key={i}
              target="_blank"
            >
              item no.:- {i}
            </a>
          );
        });
        setData(images);
      } else {
        alert("No image to display");
      }
    };
  return (
    <>
      <h1> Welcome { auth.auth.username}</h1>
      Account : {account ? account : "Not connected"}
      <button className="center button" onClick={getYourData}>
        {" "}
        Get Your ACCOUNT's DATA{" "}
      </button>
      <div className="">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get other Account's Data
      </button>
      <div className="">{data2}</div>
    </>
  );
};
export default Display;
