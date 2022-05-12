import { signOut } from '../../services';

export const Logout = () => {
  return (
    <button
        onClick={() => {
          signOut()
            .then(() => window.location.reload())
            .catch((e) => console.error(e));
        }}
      >
        Log out
      </button>
  )
}