import StartingPageContent from "@/componensts/home";
import { getSession } from 'next-auth/react';

function HomePage() {
  return <StartingPageContent />;
}

export default HomePage;

export const getServerSideProps = async context => {
  const session = await getSession({req: context.req});

  if(session) {
    return {
      redirect: {
        destination: '/profile',
        permanent: false
      }
    }
  }

  return {
    props: { }
  }
}

