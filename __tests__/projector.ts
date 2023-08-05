import { Operation } from "../src/config";
import Projector, { Data } from "../src/projector";

function getData() {
    return {
        projector: {
            "/": {
                "foo": "bar1",
                "fm": "is_okay",
            },
            "/foo": {
                "foo": "bar2",
            },
            "/foo/bar": {
                "foo": "bar3",
            },
        }
    }
}

function getProjector({ pwd, data = getData() }: { pwd: string, data?: Data }): Projector {
    return new Projector({
        args: [],
        operation: Operation.Print,
        pwd,
        config: "",
    }, data);
}

test("getValueAll", function() {
    const projector = getProjector({ pwd: "/foo/bar" });

    expect(projector.getValueAll()).toEqual({
        "foo": "bar3",
        "fm": "is_okay",
    });
});

test("getValue", function() {
    let projector = getProjector({ pwd: "/foo/bar" });
    expect(projector.getValue("foo")).toEqual("bar3");
    projector = getProjector({ pwd: "/foo" });
    expect(projector.getValue("foo")).toEqual("bar2");
    expect(projector.getValue("fm")).toEqual("is_okay");
});

test("setValue", function() {
    const data = getData();
    let projector = getProjector({ pwd: "/foo/bar", data: data });

    projector.setValue("foo", "baz");
    expect(projector.getValue("foo")).toEqual("baz");

    projector.setValue("fm", "is_kinda_okay");
    expect(projector.getValue("fm")).toEqual("is_kinda_okay");

    projector = getProjector({ pwd: "/", data: data });
    expect(projector.getValue("fm")).toEqual("is_okay");
});

test("removeValue", function() {
    const projector = getProjector({ pwd: "/foo/bar" });

    projector.removeValue("fm");
    expect(projector.getValue("fm")).toEqual("is_okay");

    projector.removeValue("foo");
    expect(projector.getValue("foo")).toEqual("bar2");
})
