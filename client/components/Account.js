import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Account = () => {
    return (
        <div className='account-info-container'>
            <form>
                <div>
                    <label htmlFor="username">
                        <small>Username</small>
                    </label>
                    <input name="username" type="text" />
                    <label htmlFor="email">
                        <small>Email</small>
                    </label>
                    <input name="email" type="text" />
                    <label htmlFor="password">
                        <small>Password</small>
                    </label>
                    <input name="password" type="text" />
                    <label htmlFor="address">
                        <small>address</small>
                    </label>
                    <input name="address" type="text" />
                    <label htmlFor="birthday">
                        <small>Birthday</small>
                    </label>
                    <input name="birthday" type="text" />
                </div>
            </form>
        </div>
    )
}

export default Account;