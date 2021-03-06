import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import './MessageForm.css'
import { AppContext } from '../context/appContext'


function MessageForm() {
    const { socket, currentRoom, setCurrentRoom, messages, setMessages, personalMessage, setPersonalMessage, newMessage, setNewMessage } = useContext(AppContext)
    const messageEndRef = useRef(null)
    const [message, setMessage] = useState("")
    const user = useSelector((state) => state.user)

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    function getFormattedDate() {
        const date = new Date()
        const year = date.getFullYear()
        let month = (1 + date.getMonth()).toString()
        month = month.length > 1 ? month : '0' + month
        let day = (1 + date.getDay()).toString()
        day = day.length > 1 ? day : '0' + day

        return month + "/" + day + "/" + year
    }
    const todayDate = getFormattedDate()

    socket.off('room-messages').on('room-messages', (roomMessages) => {
        setMessages(roomMessages)
        console.log("room messages:", roomMessages);
    })

    function handleSubmit(e) {
        e.preventDefault()
        if (!message) return

        const today = new Date()
        const minutes = today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()
        const time = today.getHours() + ":" + minutes
        const roomId = currentRoom
        socket.emit('message-room', roomId, message, user, time, todayDate)
        setMessage("")

    }

    function scrollToBottom() {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            <div className='messages-output'>
                {!user && <div className='alert alert-danger'>Login to continue</div>}
                {user && !personalMessage?._id && <div className='alert alert-info'>Your are in the {currentRoom} room</div>}
                {user && personalMessage?._id && (
                    <>
                        <div className='alert alert-info chat-info'>
                            <div>
                                {personalMessage.name}
                                <img src={personalMessage.url} alt="" className='chat-profile-picture'></img>
                            </div>
                        </div>
                    </>
                )}
                {user && messages.map(({ _id: date, messageByDates }, idx) => (
                    <div key={idx}>
                        <p className='alert alert-info text-center message-date-indicator'>{date}</p>
                        {messageByDates?.map(({ content, time, from: sender }, msgIdx) => (
                            <div className={sender?.email == user?.email ? "message" : "incoming-message"} key={msgIdx}>
                                <div className='message-inner'>
                                    <div className='d-flex align-items-center mb-3'>
                                        <img src={sender.url} alt="" style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'contain', marginRight: 10 }} />
                                        <p className='message-sender'>{sender._id === user?._id ? "You" : sender.name}</p>
                                    </div>
                                    <p className='message-content'>{content}</p>
                                    <p className='message-time'>{time}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                ))}
                <div ref={messageEndRef} />
            </div>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={11}>
                        <Form.Group>
                            <Form.Control type="text" placeholder='Your message' disabled={!user} value={message} onChange={(e) => setMessage(e.target.value)}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col md={1}>
                        <Button variant='primary' type='submit' disabled={!user}>
                            <i className='fas fa-paper-plane' />
                        </Button>
                    </Col>

                </Row>
            </Form>
        </>

    )
}

export default MessageForm