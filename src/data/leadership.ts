import surafelTilahunImg from "../../assets/Surafel Tilahun.jpg"
import samuelTegeneImg from "../../assets/Samuel Tegene.jpg"
import yordanosAberaImg from "../../assets/Yordanos Abera.jpg"
import akliluTesfayeImg from "../../assets/Aklilu Tesfaye.jpg"
import abenezerBelachewImg from "../../assets/Abenezer Belachew.jpg"
import tomasTizazuImg from "../../assets/Tomas Tizazu.jpg"
import temesgenAmenuImg from "../../assets/Temesgen Amenu.jpg"
import sisayGirmaImg from "../../assets/Sisay Girma (Joyce).jpg"
import milkiyasMelkaImg from "../../assets/Milkiyas Melka.jpg"

export interface LeaderMember {
  name: string
  role: string
  image: string
}

export const FOUNDER_AND_PRESIDENT: LeaderMember = {
  name: "Surafel Tilahun",
  role: "Founder and President",
  image: surafelTilahunImg,
}

export const BOARD_OF_DIRECTORS: LeaderMember[] = [
  {
    name: "Samuel Tegene",
    role: "Board Chairperson",
    image: samuelTegeneImg,
  },
  {
    name: "Yordanos Abera",
    role: "Vice Chairperson",
    image: yordanosAberaImg,
  },
  {
    name: "Aklilu Tesfaye",
    role: "Board Secretary",
    image: akliluTesfayeImg,
  },
  {
    name: "Abenezer Belachew",
    role: "Professional Development Director",
    image: abenezerBelachewImg,
  },
  {
    name: "Tomas Tizazu",
    role: "Business & Investment Director",
    image: tomasTizazuImg,
  },
  {
    name: "Temesgen Amenu",
    role: "Spiritual Affairs Director",
    image: temesgenAmenuImg,
  },
  {
    name: "Sisay Girma (Joyce)",
    role: "Events & Spiritual Activities Director",
    image: sisayGirmaImg,
  },
  {
    name: "Milkiyas Melka",
    role: "Legal, Ethics & Governance Director",
    image: milkiyasMelkaImg,
  },
]
