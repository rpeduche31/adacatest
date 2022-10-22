import React, { useMemo, useReducer } from "react";
import "./CreateOrder.css";
import RadioInput from "../../components/RadioInput";
import { CreateOrderProps } from "./CreateOrder.props";

const CreateOrderView = (props: CreateOrderProps) => {
  const { items, rules } = props;

  type SelectedItems = Record<number, string>;
  const [selectedItems, updateSelectedItems] = useReducer(
    (state: SelectedItems, newState: SelectedItems) => {
      return { ...state, ...newState };
    },
    {
      0: "",
      1: "",
      2: "",
    } as SelectedItems
  );

  const isSelected = (id: string, groupIndex: number) => {
    return id === selectedItems[groupIndex];
  };

  const blacklist: number[] = useMemo(() => {
    var temp: any = [];
    Object.keys(selectedItems).map((item: any) => {
      const num: any = selectedItems[item];
      temp = [...temp, rules[num]];
      return [];
    });

    return temp.flatMap((num: any) => num);
  }, [rules, selectedItems]);

  const isDisabled = (id: string) => {
    return blacklist.includes(+id);
  };

  const handleSelection = (value: string, groupIndex: number) => {
    updateSelectedItems({
      [groupIndex]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(selectedItems);
  };

  const type = ["Food Type", "Main Course", "Sides"];

  return items?.length > 0 ? (
    <div className="createOrder">
      <form onSubmit={handleSubmit}>
        <div className="option-group">
          {items.map((group, groupIndex) => {
            return (
              <div className="column-group" key={groupIndex}>
                <div className="dot-holder">
                  <div className="food-title">{type[groupIndex]}</div>
                  <div
                    className="dot-color"
                    style={{
                      background:
                        groupIndex === 1
                          ? selectedItems["0"] === ""
                            ? "#c02d2d"
                            : "#09bd09"
                          : groupIndex === 2
                          ? selectedItems["1"] === ""
                            ? "#c02d2d"
                            : "#09bd09"
                          : "#09bd09",
                    }}
                  />
                </div>
                {group.map((item) => {
                  return (
                    <div
                      className={`option-list ${
                        isSelected(item.id, groupIndex) && !isDisabled(item?.id)
                          ? "selected-option"
                          : ""
                      } ${isDisabled(item?.id) ? "disabled-option" : ""}`}
                      key={item?.id}>
                      <RadioInput
                        checked={isSelected(item.id, groupIndex)}
                        disabled={
                          groupIndex === 1
                            ? selectedItems["0"] === ""
                              ? true
                              : isDisabled(item?.id)
                            : groupIndex === 2
                            ? selectedItems["1"] === ""
                              ? true
                              : isDisabled(item?.id)
                            : isDisabled(item?.id)
                        }
                        label={item?.value}
                        value={item?.id}
                        onSelect={(value: string) =>
                          handleSelection(value, groupIndex)
                        }
                      />
                    </div>
                  );
                })}
                <br />
              </div>
            );
          })}
        </div>
        <div className="submit-button">
          <input className="submit-input-button" type="submit" />
        </div>
      </form>
    </div>
  ) : (
    <div className="loading-text">Loading...</div>
  );
};

export default CreateOrderView;
