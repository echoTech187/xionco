"use server";
import { cookies } from "next/headers"


async function setSession(key: string, value: string) {
    const cookieStore = await cookies()
    cookieStore.set(key, value)
}


async function getToken() {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')
    return token;

}

async function getSession() {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')
    return session;
}

async function removeSession(keys: string[] | string) {
    const cookieStore = await cookies()
    if (Array.isArray(keys)) {
        keys.forEach(key => {
            cookieStore.delete(key)
        })
        return
    }
    cookieStore.delete(keys)

}
async function isAuthenticated() {
    const token = await getToken()
    const session = token?.value
    if (!session) return false
    return true
}

export { isAuthenticated, setSession, getToken, getSession, removeSession }