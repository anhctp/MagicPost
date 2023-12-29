'use client'
import { getAllWarehouses, getWarehouseById } from '@/services/ceo/ceoApi';
import { useEffect, useState } from "react";

export const getAllWarehouse = () => {
    const [warehouses, setWarehouse] = useState<any>([]);
    const getWarehouses = async() => {
        await getAllWarehouses().then((res)=> {
            setWarehouse(res.data);
    })}

    useEffect(() => {
        getWarehouses();
    },[])
    return warehouses
}

export const useWarehouse = (id: number) => {
    const [location, setLocation] = useState<any>([]);
    const Warehouse = async() => {
        if (id) {
            await getWarehouseById(id).then((res) => {
                setLocation(res.data);
            });
            return id;
        }
    };
    useEffect(() => {
        Warehouse();
    }, [id]);
    
    return location
};
