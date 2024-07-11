"use client"
import { useState } from "react";
import { useAccount ,useSendTransaction,useReadContract} from "wagmi";
import {contractABI} from "../../utils/contractA.json";
import { ethers } from "ethers";
import Modal from "./components/modal";
export default function Home() {
  const [getterResult, setGetterResult] = useState('');
  const [setterResult, setSetterResult] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [openModal,setOpenModal] = useState(false);
  const {address} = useAccount();
  const {
    data: hash,
    isPending: isTransactionPending,
    isError: isTransactionError,
    isSuccess:isTransactionSuccess,
    sendTransactionAsync,
  } = useSendTransaction();
  
  const contractAAddress = "0xDDF827838Ccbc80EF031068e8aD8C5b4B21c6079";

  const readAbi = [
    {
      "inputs":[
         
      ],
      "name":"getValue",
      "outputs":[
         {
            "internalType":"uint256",
            "name":"",
            "type":"uint256"
         }
      ],
      "stateMutability":"view",
      "type":"function"
   }
  ]
 
const handlesendTransction =async ()=>{
  if(!inputValue){
    alert("Please enter a value");
  }
  const abi =[
    {
      "inputs":[
         {
            "internalType":"uint256",
            "name":"newValue",
            "type":"uint256"
         }
      ],
      "name":"setValue",
      "outputs":[
         
      ],
      "stateMutability":"nonpayable",
      "type":"function"
   },
  ]
  setOpenModal(true);
  try{
  const contract = new ethers.Contract(contractAAddress,abi);
  const data = contract.interface.encodeFunctionData('setValue',[inputValue]);
  const tx = await sendTransactionAsync({
    to:contractAAddress,
    data:data
  })  
  console.log("transaction sent: ", tx);

}catch(error){
   console.error("error sending transction",error);
}
}
const { data: contractValue, error, isLoading, refetch:refetchRead } = useReadContract({
  address: contractAAddress,
  abi: readAbi,
  functionName: 'getValue',
  args: [], 
});

 
  
  const closeModal = ()=>{
    setOpenModal(false);
  }
  const handleGetterClick = () => {
    // Implement your getter function logic here
    setGetterResult('Getter result');
  };

  const handleSetterSubmit = (e) => {
    e.preventDefault();
    // Implement your setter function logic here
    setSetterResult(`Setter result: ${inputValue}`);
    setInputValue('');
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleConnectWallet = () => {
    setIsConnected(true);
  };
  console.log(contractValue);
 
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-blue-300 transform rotate-6 rounded-lg shadow-lg"></div>
      <div className="relative z-10 bg-white shadow-lg rounded-lg p-8 space-y-8">
        {!address ? (
          <div className="text-center flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to My DApp</h1>
            <w3m-button />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <w3m-button className="mb-8 mx-auto block" />
            <div className="border-2 border-gray-300 rounded-lg shadow-md">
              <div className="p-4">
                <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">Smart Contract Interaction</h1>

                {/* Getter Example */}
                <div className="border-t-2 border-blue-400 pt-4">
                  <h2 className="text-2xl font-semibold text-blue-800 text-center mb-4">Getter Function</h2>
                  <div className="flex flex-col items-center space-y-4">
                  <div className="mt-4">
                      <p className="text-gray-800">{String(contractValue)}</p>
                    </div>
                    <button
                      className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-700 hover:to-blue-900 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                      onClick={()=>refetchRead()}
                    >
                      Get Data
                    </button>
                  
                  </div>
                </div>

                {/* Setter Example */}
                <div className="border-t-2 border-green-400 pt-4 mt-8">
                  <h2 className="text-2xl font-semibold text-green-800 text-center mb-4">Setter Function</h2>
                  <form className="flex flex-col items-center space-y-4" onSubmit={handleSetterSubmit}>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder="Enter value"
                      className="border-2 border-gray-400 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-700 hover:to-green-900 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                    onClick={handlesendTransction}
                    >
                      Set Data
                    </button>
                  </form>
                  <p className="mt-4 text-gray-800">{setterResult}</p>
                </div>
              </div>
            </div>

            
            <Modal
    show={openModal}
    onClose={closeModal}
    isTransactionPending={isTransactionPending}
    isTransactionError={isTransactionError}
    isTransactionSuccess={isTransactionSuccess}
     hash={hash}
    />
          </div>
          
        )}
      </div>
    </div>
   
  </div>
  );
}
