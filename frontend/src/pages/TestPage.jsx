import { useEffect, useState } from "react";
import TestForm from "../components/TestForm";
import { getTest } from "../service/testApi";

const TestPage = () => {
  const [testMessage, setTestMessage] = useState('')

  useEffect(() => {
    getTest() 
    .then((res) => {
      setTestMessage(res.data)
    }).catch((err) => {
      console.error('연결 실패 >>>>>>>' + err)
    })
  }, [])

  return (
    <>
      <TestForm testMessage={testMessage} />
    </>
  )
}

export default TestPage; 