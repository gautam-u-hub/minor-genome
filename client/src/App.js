import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import "./App.css";
import Submissioncategory from "./components/inputs/Submissioncategory";
import Spinner from "./components/inputs/Spinner";
import Navbar_herostart from "./components/inputs/Navbar_herostart";
import About from "./components/inputs/About";
import Footer from "./components/inputs/Footer";
import Service from "./components/inputs/Service"
import Booking from "./components/inputs/Booking";
import "./css/style.css"
import "./css/bootstrap.min.css"
import { BrowserRouter as Router, Routes, BrowserRouter ,Route,useLocation,useNavigate,Switch} from 'react-router-dom';




function App() {
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
          signer
        );
        //console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);
  return (
    <>
 

    
    

     
          <Router>
       
          
        <Switch>
          
        <Route exact path="/">
        
          {/* <Spinner></Spinner> */}
          <Navbar_herostart></Navbar_herostart>
          <About></About>
         

          {/* <p style={{ color: "black" }}>
          Account : {account ? account : "Not connected"}
        </p>
        <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>
        <Display contract={contract} account={account}></Display>   */}
        {/* <Submissioncategory></Submissioncategory> */}
        <Service></Service>
        
        
        
       <Footer></Footer>

      
       
      
    
       </Route>
        
     
       
        <Route exact path="/FileUpload" >
               <Navbar_herostart></Navbar_herostart>
               <FileUpload
          account={account}
          provider={provider}
          contract={contract}
        ></FileUpload>

<Display contract={contract} account={account}></Display>

{!modalOpen && (
        <button className="share" class="btn btn-outline-dark py-3 px-5 mt-2"onClick={() => setModalOpen(true)}>
          Share
        </button>
      )}
      {modalOpen && (
        <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
      )}

<Footer></Footer>
          </Route>
        
        
        </Switch>
        </Router>
      
    </>
  );
}

export default App;
