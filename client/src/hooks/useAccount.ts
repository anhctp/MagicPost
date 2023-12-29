import { useEffect, useState } from "react";
import { findAllUser, findUserbyId } from "@/services/ceo/ceoApi";

export const allAccount = () => {
    const [data, setData] = useState<any>([]);
    const getUsers = async () => {
        const res = await findAllUser();
        setData(res.data);
    };
    useEffect(() => {
        getUsers();
    }, []);

    return data;
}


const useAccount = (userId: number) => {
    const [user, setUser] = useState<any>([]);
    const Account = async () => {
        if (userId) {
            await findUserbyId(userId).then((res) => {
                setUser(res.data);
            });
            return userId;
        }
    };
    useEffect(() => {
        Account();
    }, [userId]);
    return { user };
};

export default useAccount;
