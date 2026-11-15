// import { useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import contactImg from "../images/contact-img.svg";
// import 'animate.css';
// import TrackVisibility from 'react-on-screen';

// export const Contact = () => {
//   const formInitialDetails = {
//     firstName: '',
//     lastName: '',
//     email: '',
//     phone: '',
//     message: ''
//   }
//   const [formDetails, setFormDetails] = useState(formInitialDetails);
//   const [buttonText, setButtonText] = useState('Send');
//   const [status, setStatus] = useState({});

//   const onFormUpdate = (category, value) => {
//       setFormDetails({
//         ...formDetails,
//         [category]: value
//       })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setButtonText("Sending...");
//     let response = await fetch("http://localhost:5000/contact", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify(formDetails),
//     });
//     setButtonText("Send");
//     let result = await response.json();
//     setFormDetails(formInitialDetails);
//     if (result.code == 200) {
//       setStatus({ succes: true, message: 'Message sent successfully'});
//     } else {
//       setStatus({ succes: false, message: 'Something went wrong, please try again later.'});
//     }
//   };

//   return (
//     <section className="contact" id="connect">
//       <Container>
//         <Row className="align-items-center">
//           <Col size={12} md={6}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="Contact Us"/>
//               }
//             </TrackVisibility>
//           </Col>
//           <Col size={12} md={6}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//                 <h2>Get In Touch</h2>
//                 <form onSubmit={handleSubmit}>
//                   <Row>
//                     <Col size={12} sm={6} className="px-1">
//                       <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e) => onFormUpdate('firstName', e.target.value)} />
//                     </Col>
//                     <Col size={12} sm={6} className="px-1">
//                       <input type="text" value={formDetails.lasttName} placeholder="Last Name" onChange={(e) => onFormUpdate('lastName', e.target.value)}/>
//                     </Col>
//                     <Col size={12} sm={6} className="px-1">
//                       <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e) => onFormUpdate('email', e.target.value)} />
//                     </Col>
//                     <Col size={12} sm={6} className="px-1">
//                       <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e) => onFormUpdate('phone', e.target.value)}/>
//                     </Col>
//                     <Col size={12} className="px-1">
//                       <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e) => onFormUpdate('message', e.target.value)}></textarea>
//                       <button type="submit"><span>{buttonText}</span></button>
//                     </Col>
//                     {
//                       status.message &&
//                       <Col>
//                         <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
//                       </Col>
//                     }
//                   </Row>
//                 </form>
//               </div>}
//             </TrackVisibility>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   )
// }

// import { useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import contactImg from "../images/contact-img.svg";
// import 'animate.css';
// import TrackVisibility from 'react-on-screen';

// export const Contact = () => {
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [buttonText, setButtonText] = useState('Ask');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setButtonText("Thinking...");

//     try {
//       const response = await fetch("http://localhost:5000/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json;charset=utf-8" },
//         body: JSON.stringify({ prompt: question }),
//       });

//       const data = await response.json();
//       setAnswer(data.answer || "AI 응답 없음");
//     } catch (err) {
//       console.error(err);
//       setAnswer("서버 오류. 다시 시도해주세요.");
//     }

//     setButtonText("Ask");
//   };

//   return (
//     <section className="contact" id="ask-ai">
//       <Container>
//         <Row className="align-items-center">
//           <Col size={12} md={6}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="AI Assistant" />
//               }
//             </TrackVisibility>
//           </Col>
//           <Col size={12} md={6}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//                   <h2>AI에게 질문하기</h2>
//                   <form onSubmit={handleSubmit}>
//                     <Row>
//                       <Col size={12} className="px-1">
//                         <textarea
//                           rows="6"
//                           value={question}
//                           placeholder="예) 5월에 부모님이랑 갈만한 여행지 알려줘"
//                           onChange={(e) => setQuestion(e.target.value)}
//                         />
//                         <button type="submit"><span>{buttonText}</span></button>
//                       </Col>
//                       {answer && (
//                         <Col size={12} className="mt-3">
//                           <div className="ai-answer-box">
//                             <strong>AI 응답:</strong>
//                             <p>{answer}</p>
//                           </div>
//                         </Col>
//                       )}
//                     </Row>
//                   </form>
//                 </div>
//               }
//             </TrackVisibility>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// import { useState } from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import contactImg from "../images/contact-img.svg";
// //import 'animate.css';
// import TrackVisibility from 'react-on-screen';
// import '../css/Contact.css'; 

// export const Contact = () => {
//   const [question, setQuestion] = useState('');
//   const [chatHistory, setChatHistory] = useState([]); // 💬 이전 질문/답 저장
//   const [buttonText, setButtonText] = useState('Ask');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!question.trim()) return;

//     setButtonText("Thinking...");

//     try {
//       const response = await fetch("http://localhost:5000/ask", {
//         method: "POST",
//         headers: { "Content-Type": "application/json;charset=utf-8" },
//         body: JSON.stringify({ prompt: question }),
//       });

//       const data = await response.json();
//       const aiReply = data.answer || "AI 응답 없음";

//       setChatHistory([...chatHistory, { type: "user", text: question }, { type: "ai", text: aiReply }]);
//       setQuestion('');
//     } catch (err) {
//       console.error(err);
//       setChatHistory([...chatHistory, { type: "user", text: question }, { type: "ai", text: "서버 오류. 다시 시도해주세요." }]);
//     }

//     setButtonText("Ask");
//   };

//   return (
//     <section className="contact" id="ask-ai">
//       <Container>
//         <Row className="align-items-center">
//           <Col size={12} md={6}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <img className={isVisible ? "animate__animated animate__zoomIn" : ""} src={contactImg} alt="AI Assistant" />
//               }
//             </TrackVisibility>
//           </Col>
//           <Col size={12} md={6}>
//             <TrackVisibility>
//               {({ isVisible }) =>
//                 <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
//                   <h2>AI에게 질문하기</h2>
//                   <form onSubmit={handleSubmit}>
//                     <textarea
//                       rows="4"
//                       value={question}
//                       placeholder="예) 가을에 부모님과 국내 여행 추천해줘"
//                       onChange={(e) => setQuestion(e.target.value)}
//                       style={{ width: "100%", marginBottom: "10px" }}
//                     />
//                     <button type="submit"><span>{buttonText}</span></button>
//                   </form>

//                   {/* 💬 말풍선 출력 */}
//                   <div className="chat-container">
//                     {chatHistory.map((msg, idx) => (
//                       <div
//                         key={idx}
//                         className={`chat-bubble ${msg.type === "user" ? "user-bubble" : "ai-bubble"}`}
//                       >
//                         {msg.text}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               }
//             </TrackVisibility>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };


import { useState, useRef, useEffect } from "react";
import { Container } from "react-bootstrap";
import '../css/Contact.css'; 

export const Contact = () => {
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [buttonText, setButtonText] = useState('Send');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userMessage = { type: "user", text: question };
    setChatHistory((prev) => [...prev, userMessage]);
    setButtonText("Thinking...");

    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({ prompt: question })
      });

      const data = await response.json();
      const aiReply = data.answer || "AI 응답 없음";

      setChatHistory((prev) => [...prev, { type: "ai", text: aiReply }]);
      setQuestion('');
      setQuestion('');
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [...prev, { type: "ai", text: "서버 오류. 다시 시도해주세요." }]);
    }

    setButtonText("Send");
  };

  return (
    <section className="chat-interface">
      <Container>
        <h2 className="mt-3 mb-4 text-center">WEGO 여행 도우미</h2>

        <div className="chat-box">
          <div className="chat-history">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-bubble ${msg.type === "user" ? "user-bubble" : "ai-bubble"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              placeholder="예) 가을에 부모님과 국내 여행 추천해줘"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button type="submit" className="chat-submit">{buttonText}</button>
          </form>
        </div>
      </Container>
    </section>
  );
};
