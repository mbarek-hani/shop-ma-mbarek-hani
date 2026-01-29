function NotFound() {
    return (
        <div className="flex flex-col items-center mt-20 text-slate-900 dark:text-slate-100">
            <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">Sorry, the page you are looking for does not exist.</p>
        </div>
    );
}

export default NotFound;