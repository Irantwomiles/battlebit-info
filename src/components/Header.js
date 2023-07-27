import {Container, Nav, Navbar} from "react-bootstrap";


function Header() {
    return (
        <Navbar expand="lg" className="nav-header mb-2">
            <Container>
                <Navbar.Brand href="/" className={"fw-bold"}>Battlebit Stats</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Server Browser</Nav.Link>
                        <Nav.Link href="/weapons" disabled={true}>Weapons</Nav.Link>
                        <Nav.Link href="/maps" disabled={true}>Maps</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;