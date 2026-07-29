import AppLoader from '@/components/shared/AppLoader';
import { HashLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <HashLoader></HashLoader>
        </div>
    );
};

export default loading;
