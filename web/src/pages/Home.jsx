import { Link } from 'react-router-dom';
import { Button } from '@/components';

function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center text-slate-900 dark:text-slate-100">
            <div className="flex flex-col gap-8 items-center text-center px-2 max-w-2xl">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-slate-100">
                    Bienvenue sur Shop Ma
                </h1>
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                    Découvrez notre sélection exclusive de produits de qualité.
                    Nous vous proposons les meilleurs articles pour satisfaire tous vos besoins.
                </p>
                <Link to="/products">
                    <Button>Voir nos produits</Button>
                </Link>
            </div>
        </div>
    );
}

export default Home;