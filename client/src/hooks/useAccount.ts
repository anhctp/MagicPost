'use client'
import { getAllTransaction, manageTransaction } from '@/services/ceo/ceoApi';
import { useEffect, useState } from "react";

export const useAllAccount = () => {
    const [allTransaction, setAllTransaction] = useState<any>([]);
    const getAllTransactionAccount = async () => {
        await getAllTransaction().then((response) => {
            setAllTransaction(response.data.getAllTransantion);
        })
    }

    useEffect(() => {
        getAllTransactionAccount();
    }, []);

    return {
        allTransaction,
    };
}

const useAccount = (id: number) => {
    const [transactionAccount, setTransActionAccount] = useState<any>([]);
    const getManageTransactions = async () => {
        await manageTransaction(id).then((response) => {
            setTransActionAccount(response.data.mangage_transaction);
        });
    };

    useEffect(() => {
        getManageTransactions();
    }, [id]);

    return {
        transactionAccount
    };
};

export default useAccount;
