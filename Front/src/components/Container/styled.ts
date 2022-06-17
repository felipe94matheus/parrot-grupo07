import styled from "styled-components";

export const BodyContainer = styled.div`
    
    max-width: 100%;
    height: 70vh;
    margin-top: 23vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media (max-width: 700px) {
        box-shadow: none;
        border: none;
        display: flex;
        flex-direction: column;
      }
`;