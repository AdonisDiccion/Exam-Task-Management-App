// utils/toast.ts
import { toast } from 'react-toastify';

export const showSuccess = (msg: string) => toast.success(msg);
export const showInfo = (msg: string) => toast.info(msg);
export const showError = (msg: string) => toast.error(msg);
