import AppLoader from '@/components/shared/AppLoader';
import { HashLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <HashLoader color="#FCAB35" />
        </div>
    );
};

export default loading;
