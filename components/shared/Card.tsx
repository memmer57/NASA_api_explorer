import './Card.scss'
import Link from 'next/link'
import Image from 'next/image'

interface IProps {
    href: string
    imageSrc: string
    imageAlt: string
    header: string
    description: string
}

export default function Card(props: IProps) {
    return (
        <Link className="card" href={props.href}>
            <div className="card-header">
                <Image
                    src={props.imageSrc}
                    alt={props.imageAlt}
                    width={400}
                    height={300}
                />
            </div>
            <div className="card-body">
                <h5>{props.header}</h5>
                <p>{props.description}</p>
            </div>
        </Link>
    )
}
