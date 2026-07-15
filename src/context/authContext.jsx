import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import { toast } from "sonner";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getCurrentUser() {
        const data = await apiFetch("/auth/me");
        setUser(data.data);

        return data.data;
    }

    useEffect(() => {
        async function checkLogin() {
        try {
            await getCurrentUser();
        } catch {
            // 401 = belum login
            setUser(null);
        } finally {
            setLoading(false);
        }
        }

        checkLogin();
    }, []);

    async function login(username, password) {
        try {
        // hanya membuat cookie
        const result = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({
            username,
            password,
            }),
        });

        // setelah cookie dibuat, ambil data user
        const currentUser = await getCurrentUser();
        const roles = {cashier : "Kasir", manager : "Pengelola"}

        toast.success(`Berhasil login sebagai ${roles[currentUser.role]}`, {duration : 3000});

        return result;
        } catch (error) {
        toast.error(error.message || "Login gagal", {duration : 2000});
        throw error
        }
    }

    async function logout(){
            try{
                await apiFetch("/auth/logout", {method : "POST"})
                setUser(null)
                toast.success("Berhasil Logout", {duration : 2000})
            } catch (err) {
                toast.error(err.message || "Logout gagal")
                throw err
            }
        }

    return (
        <AuthContext.Provider
        value={{
            user,
            loading,
            login,
            logout
        }}
        >
        {children}
        </AuthContext.Provider>
    );
}