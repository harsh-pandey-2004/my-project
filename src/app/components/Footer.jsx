import "../../app/globals.css"

const Footer = () => {
    return (
      <footer className="bg-indigo-600 text-white text-center p-4 mt-8">
        <p>&copy; {new Date().getFullYear()} Task Manager-Harsh Pandey. All Rights Reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  