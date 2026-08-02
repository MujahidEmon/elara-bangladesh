import AppLoader from '@/components/shared/AppLoader';
import { HashLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <HashLoader color='orange'></HashLoader>
        </div>
    );
};

export default loading;
