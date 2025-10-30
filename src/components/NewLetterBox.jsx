import React from 'react';
import { SignedIn, SignedOut, UserButton, SignInButton } from '@clerk/clerk-react';

const NewLetterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
        alert('Merci pour votre inscription !');
        // Ici tu peux aussi récupérer l'email ou l'userId de Clerk si l'utilisateur est connecté
    }

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium text-gray-800'>
                Subscribe now & get 20% off
            </p>

            <p className='text-gray-400 mt-3'>
                Ne manquez plus aucune exclusivité ! Abonnez-vous et profitez de réductions réservées à nos membres.
            </p>

            {/* Si l'utilisateur est connecté, on peut afficher un message personnalisé ou pré-remplir l'email */}
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Si l'utilisateur n'est pas connecté, on propose de se connecter via Clerk */}
            <SignedOut>
                <SignInButton mode="modal">
                    <button className='bg-black text-white text-xs px-10 py-4 mb-4'>
                        Connectez-vous pour vous abonner
                    </button>
                </SignInButton>
            </SignedOut>
        </div>
    );
}

export default NewLetterBox;
