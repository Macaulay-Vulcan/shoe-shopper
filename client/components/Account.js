import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Account = () => {
    return (
        <div>
            <form>
                <div>
                    <label htmlFor="username">
                        <small>Username</small>
                    </label>
                    <input name="username" type="text" />
                </div>
            </form>
        </div>
    )
}

export default Account;