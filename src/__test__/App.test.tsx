import { describe, expect, test, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { render } from "../setupTest";
import { NavBar } from "../components/common/NavBar/NavBar";
import { MessageInput } from "../components/ChattingPage/MessageInput/MessageInput";
import { ChattingRoom } from "../components/ChattingPage/ChattingRoom/ChattingRoom";
import { InfoPage } from "../components/InfoPage/InfoPage";
import { RegisterUserModal } from "../components/common/RegisterUserModal/RegisterUserModal";

describe("Navbar", () => {
  test("should show title", () => {
    render(<NavBar />);
    const headingChatRoom = screen.getByRole("heading");
    expect(headingChatRoom).toBeInTheDocument();
  });
  test("should have list of navigation", async () => {
    render(<NavBar />);
    const listItemElements = await screen.findAllByRole("listitem");
    expect(listItemElements).not.toHaveLength(0);
  });
});

const setCurrentUser = vi.fn();

describe("RegisterUserModal", () => {
  // mock props
  test("Enter button should disabled if enter name is empty", () => {
    const mockProps = {
      setCurrentUser: setCurrentUser,
    };

    render(<RegisterUserModal {...mockProps} />);
    const enterButton = screen.getByRole("button");
    expect(enterButton).toBeDisabled();
  });

  test("Enter button should not disabled if enter name is not empty", () => {
    const mockProps = {
      setCurrentUser: setCurrentUser,
    };
    render(<RegisterUserModal {...mockProps} />);

    const enterButton = screen.getByRole("button");

    expect(enterButton).not.toBeDisabled();
  });

  test("Test loading state", () => {
    const mockProps = {
      setCurrentUser: setCurrentUser,
    };
    render(<RegisterUserModal {...mockProps} />);

    const enterButton = screen.getByRole("img");

    // data test-id
    expect(enterButton).toBeInTheDocument();
  });

  test("Test Visible State if false", () => {
    const mockProps = {
      setCurrentUser: setCurrentUser,
    };
    render(<RegisterUserModal {...mockProps} />);
    const registerModal = screen.queryByTestId("register-modal");
    expect(registerModal).toBeNull();
  });
});

describe("MessageInput testing", () => {
  test("Existing MessageInput Component", () => {
    const sendANewMessage = vi.fn();
    render(<MessageInput sendANewMessage={sendANewMessage} />);
    const MessageInputComponent = screen.getByTestId("message-input");
    expect(MessageInputComponent).toBeInTheDocument();
  });
  test("Input Value", () => {
    const sendANewMessage = vi.fn();
    render(<MessageInput sendANewMessage={sendANewMessage} />);
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Hello,\nWorld!" } });
    expect(input).toHaveValue("Hello,\nWorld!");
  });
  test("Send message", () => {
    const sendANewMessage = vi.fn();
    render(<MessageInput sendANewMessage={sendANewMessage} />);
    const input = screen.getByRole("textbox");
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: "Hello,\nWorld!" } });
    const sendMessageButton = screen.getByTestId("send-message-button");
    fireEvent.click(sendMessageButton);
    expect(sendANewMessage).toHaveBeenCalledTimes(1);
  });
});

describe("ChattingRoom testing", () => {
  test("Empty chat room", () => {
    render(<ChattingRoom currentUser={{ id: "asdasd", name: "Tuu ne" }} />);
    const bubbleMessageComponents = screen.queryAllByTestId("bubble-message");
    expect(bubbleMessageComponents.length).toBe(0);
  });

  // Need to set up init local messages state (redux store) for testing this case

  // test("Chat room has messages", async () => {
  //   render(<ChattingRoom currentUser={{ id: "asdasd", name: "Tuu ne" }} />);
  //   const bubbleMessageComponents = screen.queryAllByTestId("bubble-message");
  //   expect(bubbleMessageComponents.length).not.toBe(0);
  // });
});

describe("InfoPage testing", () => {
  test("Test InfoPage if it doesnt have any users", () => {
    render(<InfoPage />);
    const userInfo = screen.queryAllByTestId("user-info");
    expect(userInfo.length).toBe(0);
  });

  // Need to set up init local users state (redux store) for testing this case

  // test("Test InfoPage", () => {
  //   render(<InfoPage />);
  //   const bubbleMessageComponents = screen.queryAllByTestId("user-info");
  //   expect(bubbleMessageComponents.length).not.toBe(0);
  // });
});
