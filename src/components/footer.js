export default function Footer({ onIsArchiveOpen, isArchiveOpen }) {
  return (
    <footer>
      <button onClick={() => onIsArchiveOpen(false)}>
        <img
          src={isArchiveOpen ? "./images/home.svg" : "./images/home-active.svg"}
          alt="Home icon"
        />
      </button>
      {/* <button>
          <img src="./images/add-item.svg" alt="Home icon" />
        </button> */}

      <button onClick={() => onIsArchiveOpen(true)}>
        <img
          src={
            isArchiveOpen
              ? "./images/archive-active.svg"
              : "./images/archive.svg"
          }
          alt="Archive icon"
        />
      </button>
    </footer>
  );
}
